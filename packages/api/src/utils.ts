import * as fs from "fs"
import * as path from "path"
import { PassThrough } from "stream"
import fileTypeStream from "file-type-stream"
import * as streamToPromise from "stream-to-promise"

declare var require: {
  main: {
    filename: string;
  };
}

const UPLOAD_PATH = path.resolve(
  path.dirname(require.main.filename),
  "../uploads",
)
export const saveAssets = async (filesList) => {
  return Promise.all(
    filesList.map(async ({ originFileObj }) => {
      const {
        createReadStream,
        filename,
        mimetype,
        encoding,
      } = (await originFileObj) as any
      const Body = new PassThrough()
      const stream = createReadStream()
      const { ext } = (await new Promise((resolve) => {
        return stream.pipe(fileTypeStream(resolve)).pipe(Body)
      })) as any
      const uri = path.join(UPLOAD_PATH, `${filename}`)
      const writeToFileStream = fs.createWriteStream(uri, {
        flags: "w",
      })
      stream.pipe(writeToFileStream)
      await streamToPromise(writeToFileStream)
      return {
        uri,
        createReadStream,
        filename,
        mimetype,
        encoding,
        ext,
      }
    }),
  )
}
