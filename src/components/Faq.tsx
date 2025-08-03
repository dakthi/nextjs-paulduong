"use client";
import React from "react";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-red-700 focus-visible:ring-opacity-75">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-red-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "Aren't you specialised in anything?",
    answer: "I had decent understanding of a wide beadth of specialties, good enough to power a multi-million start-up team, but not enough to be a specialist in a corporate. Like a Swiss Army Knife, if that makes sense!",
  },
  {
    question: "What services do you offer then?",
    answer: "Project-based consultancy on marketing, AI and automation. I also make fully functioning full-stack websites, take beautiful photography of your events and teach English.",
  },
  {
    question: "Let's be more specific, how would you help me if I have a business?",
    answer:
      "I'll go into your business as an intern by morning, doing things your team does. By evening, you would be presented with a full-stack solution that automates or speed up 60-80% of your workflow.",
  },
  {
    question: "What kind of businesses are you interested in working with?",
    answer:
      "The boring ones. I mean, mom-and-pop shops, brick-and-mortar businesses—the ones with years of reputation and experience, but without the tech to match. I love bringing in automation, AI, and smarter workflows to emulsify that deep stack of expertise you’ve simmered for years. Think of it as giving your business a Michelin-star upgrade, without losing the original flavor.",
  },
];
