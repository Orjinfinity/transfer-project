import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

import { client } from "../../lib/sanity";

// async function readBody(readable) {
//   const chunks = [];
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks).toString("utf8");
// }

const handler = async (req, res) => {
  // const signature = req.headers[SIGNATURE_HEADER_NAME];

  // if (
  //   !(await isValidSignature(
  //     readBody(req),
  //     signature,
  //     process.env.SANITY_WEBHOOK_SECRET
  //   ))
  // ) {
  //   res.status(401).json({ success: false, message: "Invalid signature" });
  //   return;
  // }

  const { body } = req;

  const { _id, _type, status } = body;

  if (_type !== "transfer") {
    return res.status(200).json({ message: "Not a transfer document, skipping" });
  }

  const currentStatus = await client.fetch(
    `*[_type == "route" && _id == $id][0]{
    status,
    user {
      _id
      emailAddress
      firstName
      lastName
    }
  }`,
    {
      id: _id,
    }
  );

  if (currentStatus === status) {
    return res.status(200).json({ message: "Transfer already has status" });
  }

  try {
    if (!status) {
      client
        .patch(_id)
        .set({
          status: "pending",
        })
        .commit();
    }

    return res
      .status(200)
      .json({ message: "Transfer updated with distance and duration" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default handler;
