import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import TextareaAutosize from 'react-textarea-autosize';
import { useStore } from '../store/store';

export const APICallNode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || '');
    const [method, setMethod] = useState(data?.method || 'GET');
    const [headers, setHeaders] = useState(data?.headers || '{}');
    const updateNodeField = useStore((state) => state.updateNodeField);

    return (
        <BaseNode
            id={id}
            nodeType="APICall"
            label="API Request"
            inputs={[{ id: 'payload', position: Position.Left, label: 'Payload' }]}
            outputs={[{ id: 'response', position: Position.Right, label: 'Response' }]}
        >
            <div className="flex flex-col gap-2">
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    URL:
                    <input
                        type="text"
                        placeholder="https://api.example.com"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            updateNodeField(id, 'url', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full"
                    />
                </label>
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    Method:
                    <select
                        value={method}
                        onChange={(e) => {
                            setMethod(e.target.value);
                            updateNodeField(id, 'method', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full appearance-none"
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                    </select>
                </label>
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    Headers (JSON):
                    <TextareaAutosize
                        minRows={2}
                        value={headers}
                        onChange={(e) => {
                            setHeaders(e.target.value);
                            updateNodeField(id, 'headers', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full resize-none font-dm text-[11px]"
                    />
                </label>
            </div>
        </BaseNode>
    );
};
