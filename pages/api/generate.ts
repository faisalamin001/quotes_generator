import type { NextRequest } from "next/server";
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.NEXT_PUBLIC_ENV_VARIABLE_OPEN_AI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };
  console.log("your prompt => ", prompt);

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 1,
    top_p: 1,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  console.log("your stream => ", stream);
  return new Response(stream);
};

export default handler;
