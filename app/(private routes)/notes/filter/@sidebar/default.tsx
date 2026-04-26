import Link from "next/link";
import css from "@/components/SidebarNotes/SidebarNotes.module.css";
import { Tag } from "@/types/tag";

const tags: Tag[] = ["Work", "Personal", "Todo", "Meeting", "Shopping"];

export default function SidebarNotes() {
    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href="/notes/filter/all" className={css.menuLink}>
                    All notes
                </Link>
            </li>

            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link
                        href={`/notes/filter/${tag}`}
                        className={css.menuLink}
                    >
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
}