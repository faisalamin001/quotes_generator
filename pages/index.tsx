import Head from "next/head";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Space_Grotesk } from "@next/font/google";
import { SearchIcon } from "@heroicons/react/outline";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";

import ResizablePanel from "../components/ResizablePanel";

import Header from "../components/Header";
import Footer from "../components/Footer";

const spaceGrotesk = Space_Grotesk({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [generatedTitles, setGeneratedTitles] = useState("");
  const [text, setText] = useState("");

  const prompt = `Generate 10 quotes for ${text}. Make sure to generate 10 and its relevant and not out out of context.`;

  const generateArticleTitle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) {
      toast.error("Type a word to generate the quotes!");
      return;
    }

    setGeneratedTitles("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const data = response.body;

    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      setGeneratedTitles((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <>
      <div className={`flex flex-col items-center m-0 `}>
        <Head>
          <title>Quotes Generator</title>
          <meta
            name="description"
            content="Using Quotes Generator can help you get exact quote you are looking for. Do you have an idea of where to find? Generate your quotes idea with ease."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        {/*body*/}
        <div className="flex flex-col items-center pt-14 w-full px-4 md:px-0 max-w-screen-md">
          <h1
            className={`${spaceGrotesk.className} text-6xl font-bold text-gray-900 dark:text-zinc-300  sm:leading-9 sm:truncate mb-2 text-center sm:text-4xl lg:text-6xl xl:text-6xl`}
          >
            Quotes Generator
          </h1>
          <p className="text-slate-500 mt-5">4,118 quotes generated so far.</p>

          <form
            onSubmit={(e) => generateArticleTitle(e)}
            className="flex w-full mt-5 transition-all ease-linear hover:shadow-lg focus-within:shadow-lg  rounded-full border border-[#6366f1] dark:border-[#6366f1] p-1.5 pl-5 items-center"
          >
            <SearchIcon className="h-5 mr-3 text-[#6366f1] dark:text-gray-100" />
            <label htmlFor="search" className="sr-only"></label>
            <input
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="flex-grow focus:outline-none dark:text-white bg-transparent text-gray-700"
              placeholder="What's on your mind?"
              id="search-box"
            />
            <button
              className="border dark:border-zinc-600 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500"
              id="submit"
              aria-label="search-button"
            >
              <ArrowSmRightIcon className="w-6 h-6 text-white" />
            </button>
          </form>

          <div className="flex w-full max-w-screen-md items-center justify-between mt-8 mb-2">
            {loading && (
              <div className="mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 animate-spin text-black-600 dark:text-gray-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            )}
          </div>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{ duration: 3000 }}
          />
          <div className="h-px max-w-screen-md w-full border-b dark:border-zinc-700"></div>
          <ResizablePanel>
            <AnimatePresence mode="wait">
              <motion.div className="space-y-4 my-5">
                {generatedTitles && (
                  <>
                    <p className="text-xs text-center  text-slate-500 uppercase">
                      Click on any quote to copy it to your clipboard
                    </p>
                    <div className="max-w-screen-md grid gap-2 grid-cols-1  m-auto md:grid-cols-2">
                      {generatedTitles
                        .match(/[0-9]+.[^0-9]+/g)
                        ?.sort((a, b) => b.length - a.length)
                        ?.map((generatedTitle, index) => {
                          const textContent = generatedTitle
                            .replace(/^"|"$|[0-9]+. /g, "")
                            .trim();

                          return (
                            <div
                              className="bg-zinc-100 dark:bg-darkOffset  dark:text-gray-100 rounded-md p-3 hover:bg-gray-100 transition cursor-copy border-zinc-200 border dark:border-zinc-800"
                              onClick={() => {
                                navigator.clipboard.writeText(textContent);
                                toast.success("Title copied to clipboard");
                              }}
                              key={index}
                            >
                              <p className="text-zinc-800 dark:text-zinc-300">
                                {textContent}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </div>
        <Footer />
      </div>
    </>
  );
}
