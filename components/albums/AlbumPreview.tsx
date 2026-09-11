import Image from "next/image";
import { motion } from "framer-motion";

export function AlbumPreview({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative h-40 w-32 overflow-hidden rounded-md border border-border shadow-xl"
    >
      <Image src={imageUrl} alt={alt} fill className="object-cover" />
    </motion.div>
  );
}
