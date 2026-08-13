"""Tests for the /pipelines/parse endpoint's cycle detection (Kahn's algorithm).

Run from the backend/ directory with:  python -m pytest tests/ -v
"""
import json

import pytest
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def parse(nodes, edges):
    payload = json.dumps({"nodes": nodes, "edges": edges})
    response = client.post("/pipelines/parse", data={"pipeline": payload})
    assert response.status_code == 200
    return response.json()


def node(node_id):
    return {"id": node_id, "type": "customInput"}


def edge(source, target):
    return {"source": source, "target": target}


class TestAcyclicGraphs:
    """Graphs Kahn's algorithm should accept as valid DAGs."""

    def test_empty_graph_is_a_dag(self):
        result = parse([], [])
        assert result["is_dag"] is True
        assert result["num_nodes"] == 0
        assert result["num_edges"] == 0

    def test_single_node_no_edges_is_a_dag(self):
        result = parse([node("a")], [])
        assert result["is_dag"] is True
        assert result["num_nodes"] == 1
        assert result["num_edges"] == 0

    def test_linear_chain_is_a_dag(self):
        nodes = [node("a"), node("b"), node("c")]
        edges = [edge("a", "b"), edge("b", "c")]
        result = parse(nodes, edges)
        assert result["is_dag"] is True
        assert result["num_nodes"] == 3
        assert result["num_edges"] == 2

    def test_diamond_shaped_graph_is_a_dag(self):
        # a -> b -> d
        # a -> c -> d
        nodes = [node("a"), node("b"), node("c"), node("d")]
        edges = [edge("a", "b"), edge("a", "c"), edge("b", "d"), edge("c", "d")]
        result = parse(nodes, edges)
        assert result["is_dag"] is True

    def test_disconnected_components_all_acyclic_is_a_dag(self):
        nodes = [node("a"), node("b"), node("c"), node("d")]
        edges = [edge("a", "b"), edge("c", "d")]
        result = parse(nodes, edges)
        assert result["is_dag"] is True

    def test_isolated_nodes_with_no_edges_are_a_dag(self):
        nodes = [node("a"), node("b"), node("c")]
        result = parse(nodes, [])
        assert result["is_dag"] is True

    def test_branching_tree_is_a_dag(self):
        # a -> b, a -> c, b -> d, b -> e
        nodes = [node(n) for n in ("a", "b", "c", "d", "e")]
        edges = [edge("a", "b"), edge("a", "c"), edge("b", "d"), edge("b", "e")]
        result = parse(nodes, edges)
        assert result["is_dag"] is True


class TestCyclicGraphs:
    """Graphs Kahn's algorithm should reject -- these all contain a cycle."""

    def test_two_node_cycle_is_not_a_dag(self):
        nodes = [node("a"), node("b")]
        edges = [edge("a", "b"), edge("b", "a")]
        result = parse(nodes, edges)
        assert result["is_dag"] is False

    def test_self_loop_is_not_a_dag(self):
        nodes = [node("a")]
        edges = [edge("a", "a")]
        result = parse(nodes, edges)
        assert result["is_dag"] is False

    def test_three_node_cycle_is_not_a_dag(self):
        nodes = [node("a"), node("b"), node("c")]
        edges = [edge("a", "b"), edge("b", "c"), edge("c", "a")]
        result = parse(nodes, edges)
        assert result["is_dag"] is False

    def test_cycle_embedded_in_larger_acyclic_graph_is_not_a_dag(self):
        # a -> b -> c -> b (cycle between b and c), plus an unrelated acyclic edge d -> e
        nodes = [node(n) for n in ("a", "b", "c", "d", "e")]
        edges = [edge("a", "b"), edge("b", "c"), edge("c", "b"), edge("d", "e")]
        result = parse(nodes, edges)
        assert result["is_dag"] is False

    def test_long_cycle_is_not_a_dag(self):
        nodes = [node(n) for n in ("a", "b", "c", "d", "e")]
        edges = [
            edge("a", "b"), edge("b", "c"), edge("c", "d"),
            edge("d", "e"), edge("e", "a"),
        ]
        result = parse(nodes, edges)
        assert result["is_dag"] is False


class TestEdgeCasesAndCounts:
    def test_edges_referencing_undeclared_node_ids_are_handled(self):
        # "ghost" never appears in the nodes list, only in an edge.
        nodes = [node("a")]
        edges = [edge("a", "ghost")]
        result = parse(nodes, edges)
        assert result["num_nodes"] == 1
        assert result["num_edges"] == 1
        assert result["is_dag"] is True

    def test_num_nodes_and_num_edges_reflect_payload_size(self):
        nodes = [node("a"), node("b"), node("c")]
        edges = [edge("a", "b"), edge("b", "c")]
        result = parse(nodes, edges)
        assert result["num_nodes"] == len(nodes)
        assert result["num_edges"] == len(edges)

    def test_invalid_json_payload_returns_an_error(self):
        response = client.post("/pipelines/parse", data={"pipeline": "not valid json"})
        assert response.status_code == 200
        assert "error" in response.json()


def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_metrics_endpoint():
    response = client.get("/metrics")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
