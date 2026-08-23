import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "@/lib/uploadthing";

const handler = createRouteHandler({ router: uploadRouter });
export { handler as GET, handler as POST };
