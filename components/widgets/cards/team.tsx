import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

interface TeamsCard {
  name: string;
  position?: string;
  about?: string;
  email?: string;
  linkedin?: string;
  x?: string;
  phone?: number;
}
export const TeamsCard: React.FC<TeamsCard> = ({
  name,
  position,
  about,
  email,
  linkedin,
  x,
  phone,
}) => {

    const aboutEditor = useEditor({
        immediatelyRender : false,
        extensions : [
            StarterKit
        ],
        content : about
    })
  return <div>

  </div>;
};
