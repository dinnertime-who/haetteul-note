import { Label } from "@/components/ui/label";
import { UploadFileInput } from "./_components/upload-file-input";

export default function Home() {
  return (
    <section className="min-h-screen">
      <Label htmlFor="image-input">
        <UploadFileInput id="image-input" />
      </Label>
    </section>
  );
}
