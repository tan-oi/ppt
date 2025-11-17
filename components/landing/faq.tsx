import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as motion from "motion/react-client";

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function FaqsSection() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10">
      <div className="space-y-2 flex flex-col items-center" id="faq">
        <p className="text-amber-500 text-sm tracking-widest font-mono hover:underline">
          FAQs
        </p>
        <p className="text-zinc-50 text-center text-md sm:text-xl md:text-3xl tracking-tighter">
          Frequently asked questions
        </p>

        <p className="text-xs sm:text-md md:text-lg text-center text-muted-foreground">
          Get all your answers to the most common queries here in a jiffy
        </p>
      </div>

      <Accordion
        className="-space-y-px w-full rounded-lg bg-card border-none "
        collapsible
        defaultValue="item-1"
        type="single"
      >
        {questions.map((item, i) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
          >
            <AccordionItem
              className="relative border-y-[2px] first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b text-f"
              value={item.id}
            >
              <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline text-foreground [&[data-state=open]>svg]:rotate-180">
                {item.title}
              </AccordionTrigger>
              <motion.div>
                <AccordionContent className="px-4 pb-4 text-muted-foreground">
                  <motion.div
                    initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      y: -20,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    {item.content}
                  </motion.div>
                </AccordionContent>
              </motion.div>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
      <p className="text-muted-foreground text-center">
        Can't find what you're looking for? Contact our{" "}
        <a className="text-primary hover:underline" href="#">
          customer support team
        </a>
      </p>
    </div>
  );
}

const questions = [
  {
    id: "item-1",
    title: "What does the platform do?",
    content:
      "It generates complete presentation outlines and final slides using AI. It supports text-based, link-based, and prompt-based input, and can optionally generate AI images depending on the user's plan.",
  },
  {
    id: "item-2",
    title: "Who is this platform for?",
    content:
      "Anyone who needs fast, structured presentations without manual slide creation. Students, founders, operators, and teams who want instant outlines and well-formatted decks.",
  },
  {
    id: "item-3",
    title: "How does the credit system work?",
    content:
      "Each generation consumes credits depending on what is generated. Outline generation uses standard credits. AI images require additional credits. Credits are deducted instantly from the user's balance.",
  },
  {
    id: "item-4",
    title: "What happens if I run out of credits?",
    content:
      "You cannot generate content or images until credits are replenished. Paid users can buy more credits or upgrade their subscription.",
  },
  {
    id: "item-5",
    title: "Are AI images available on all plans?",
    content:
      "No. Free users get stock placeholder images. Paid plans unlock AI-generated images with credit deductions per image.",
  },
  {
    id: "item-6",
    title: "Is there a limit on how many images I can generate at once?",
    content:
      "Yes. A single operation can generate a maximum of four AI images. This limit exists to prevent throttling and ensure stable performance. The limit will be increased in future updates as system capacity improves.",
  },
  {
    id: "item-7",
    title: "Do unused credits expire?",
    content:
      "Credits persist. They do not expire unless explicitly stated in a future policy update.",
  },
  {
    id: "item-8",
    title: "How does subscription billing work?",
    content:
      "Subscription purchases are handled through Dodo Payments. Your plan controls your credit allowances, image-generation access, and feature limits.",
  },
  {
    id: "item-9",
    title: "What happens if AI generation fails?",
    content:
      "If an AI task fails due to a model or system issue, credits used for that task are refunded automatically.",
  },
  {
    id: "item-10",
    title: "Can I edit slides after generation?",
    content:
      "Yes. Headings, pointers, and layout types can be edited before finalizing the presentation.",
  },
];
