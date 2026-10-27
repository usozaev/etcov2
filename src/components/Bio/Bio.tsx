import type { ReactNode } from 'react';

/** Мини-рендер биографии: абзацы, **подзаголовки** и списки «- » */
export default function Bio({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flush = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={blocks.length}>
        {list.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('- ')) {
      list.push(line.slice(2));
      continue;
    }
    flush();
    if (!line) continue;
    const heading = line.match(/^\*\*(.+)\*\*$/);
    blocks.push(heading ? <h4 key={blocks.length}>{heading[1]}</h4> : <p key={blocks.length}>{line}</p>);
  }
  flush();

  return <div className="bio">{blocks}</div>;
}
