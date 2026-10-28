import { ContentBlocks } from "@/components/chapter/content-blocks";
import { IconChevronDown } from "@/components/ui/icons";
import { padBengali } from "@/lib/bengali";
import { getTopicHref } from "@/lib/content";
import type { Importance, Topic } from "@/types/content";

interface TopicDetailsProps {
  topic: Topic;
  chapterSlug: string;
  importance: Importance;
  index: number;
}

export function TopicDetails({
  topic,
  chapterSlug,
  importance,
  index,
}: TopicDetailsProps) {
  const anchor = getTopicHref(chapterSlug, importance, index);
  const id = anchor.replace("#", "");

  return (
    <details id={id} data-topic="true" className="topic" open>
      <summary className="topic-summary">
        <span className="topic-index" aria-hidden="true">
          {padBengali(index + 1)}
        </span>
        <span className="min-w-0 flex-1">
          <h3 className="topic-title">{topic.title}</h3>
          {topic.summary ? (
            <span className="mt-1 block text-sm leading-7 text-muted">
              {topic.summary}
            </span>
          ) : null}
        </span>
        <IconChevronDown className="topic-chevron" />
      </summary>

      <div className="topic-body chapter-body">
        <ContentBlocks blocks={topic.blocks} />
      </div>
    </details>
  );
}
