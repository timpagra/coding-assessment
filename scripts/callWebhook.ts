const [url] = process.argv.slice(2) ?? [];
import {z} from 'zod'

const { success } = z.string().url().safeParse(url)
if (success) {
  fetch(`http://localhost:3000/publish-updates?url=${url}`).then((response) => {
    console.log(response.status, "status");
  });
} else {
  throw new Error("You must provide a valid url argument");
}
