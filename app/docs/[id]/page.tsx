import { Presentation } from "@/components/presentation";
import { headers } from "next/headers";

export default async function PresentationDoc({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const headersList = await headers();
  const toBeGen = headersList.get("x-ai-bool");


  if(id && !toBeGen) {
    //WIP : make a db call.
  }

  const presentationData = {
    id: "tsk1091-1029-5240-9832",
    isModified: false,
    topic: "India and its festivals",
    slides: [
      {
        slideNumber: 1,
        heading: "The Science of Sleep: Unlocking Your Brain's Superpower",
        layoutId: "title",
        content: {
          "main-title": {
            widgetType: "heading",
            data: {
              content: "The Science of Sleep",
              level: 1,
            },
          },
          subtitle: {
            widgetType: "paragraph",
            data: {
              content:
                "Unlocking the hidden superpower of your brain and transforming your health through the power of a good night's rest.",
            },
          },
        },
      },
      {
        slideNumber: 2,
        heading: "Why We Sleep: More Than Just Rest",
        layoutId: "heading-paragraph",
        content: {
          "heading-1": {
            widgetType: "heading",
            data: {
              content: "Sleep is an Active Brain State",
              level: 2,
            },
          },
          "paragraph-1": {
            widgetType: "paragraph",
            data: {
              content:
                "Contrary to old beliefs, sleep is not a passive shutdown. It is a highly organized and active period where the brain works tirelessly. During these critical hours, your brain consolidates memories, clears out harmful metabolic waste, recalibrates emotional circuits, and prepares you for the challenges of the next day. This nightly maintenance is fundamental to learning, mood regulation, and long-term cognitive health, proving that what happens while you sleep is just as important as what you do while you're awake.",
            },
          },
        },
      },
      {
        slideNumber: 3,
        heading: "The Two-Process Model: Your Body's Sleep Regulators",
        layoutId: "two-column",
        content: {
          "left-column": {
            widgetType: "featureCard",
            data: {
              title: "Process S: Sleep Pressure",
              body: "Think of this as an hourglass for sleep. From the moment you wake, a neurochemical called adenosine begins to build up in your brain. The longer you are awake, the more it accumulates, increasing the 'pressure' or drive to sleep. This is the biological process that makes you feel progressively drowsier throughout the day. Sleeping is the only way to clear this adenosine and reset the hourglass.",
            },
          },
          "right-column": {
            widgetType: "featureCard",
            data: {
              title: "Process C: Circadian Rhythm",
              body: "This is your internal 24-hour master clock, primarily controlled by light exposure. It dictates the timing of your sleep-wake cycle, hormone release, and body temperature. Morning light signals your brain to be alert, while darkness in the evening triggers the release of melatonin, the hormone that facilitates sleep. A stable circadian rhythm ensures you feel sleepy and alert at the appropriate times, working in harmony with sleep pressure.",
            },
          },
        },
      },
      {
        slideNumber: 4,
        heading:
          "The Architecture of a Night: Journey Through the Sleep Stages",
        layoutId: "three-sections",
        content: {
          "section-1": {
            widgetType: "featureCard",
            data: {
              title: "Light Sleep (NREM 1-2)",
              body: "This is the entry point into slumber. Your breathing and heart rate slow down, muscles relax, and brain waves become less active. This transitional phase accounts for about half the night and prepares your body and mind for the deeper, more restorative stages.",
            },
          },
          "section-2": {
            widgetType: "featureCard",
            data: {
              title: "Deep Sleep (NREM 3)",
              body: "Often called slow-wave sleep, this is the most physically restorative stage. The body repairs tissues, boosts immune function, and builds bone and muscle. The brain's waste clearance system is also most active during this time. Waking from deep sleep is difficult and causes significant grogginess.",
            },
          },
          "section-3": {
            widgetType: "featureCard",
            data: {
              title: "REM Sleep",
              body: "Known as the mentally restorative stage, this is where vivid dreaming occurs. Your brain is highly active, consolidating memories, processing emotions, and cementing learning. Your body's major muscle groups are temporarily paralyzed to prevent you from acting out dreams. This stage is crucial for creativity and problem-solving.",
            },
          },
        },
      },
      {
        slideNumber: 5,
        heading: "The Brain's Night Shift: Cleaning, Storing, and Resetting",
        layoutId: "main-pointer",
        content: {
          uno: {
            widgetType: "paragraph",
            data: {
              content:
                "At the core of sleep's importance is the brain's dedicated maintenance crew. During deep sleep, the glymphatic system—the brain's unique cleaning service—flushes out toxic byproducts like beta-amyloid, a protein linked to Alzheimer's. Following this cleanup, REM sleep acts as a master archivist, sorting the day's experiences, strengthening important neural connections to lock in memories and learning, while pruning irrelevant information. This nightly process of cleaning and organizing is non-negotiable for maintaining cognitive health, emotional stability, and our capacity to learn.",
            },
          },
        },
      },
      {
        slideNumber: 6,
        heading: "The High Cost of Sleep Debt",
        layoutId: "heading-paragraph",
        content: {
          "heading-1": {
            widgetType: "heading",
            data: {
              content: "The Consequences of Sleep Deprivation",
              level: 2,
            },
          },
          "paragraph-1": {
            widgetType: "paragraph",
            data: {
              content:
                "Failing to get enough sleep results in 'sleep debt,' a cumulative deficit with severe consequences. Cognitively, it impairs focus, cripples decision-making, and slows reaction times. Emotionally, it destabilizes mood, leading to increased irritability and anxiety. Physically, chronic sleep deprivation is linked to a host of problems, including a weakened immune system, weight gain, high blood pressure, and an increased risk of developing chronic conditions like type 2 diabetes and heart disease. It affects every aspect of your health.",
            },
          },
        },
      },
      {
        slideNumber: 7,
        heading: "Actionable Steps for Better Sleep Tonight",
        layoutId: "three-sections",
        content: {
          "section-1": {
            widgetType: "featureCard",
            data: {
              title: "Control Your Environment",
              body: "Turn your bedroom into a sanctuary for sleep. Keep it cool (around 18°C / 65°F), dark by using blackout curtains, and quiet. This signals to your brain that it's time to wind down and produce melatonin, facilitating a quicker and deeper sleep onset.",
            },
          },
          "section-2": {
            widgetType: "featureCard",
            data: {
              title: "Build a Consistent Routine",
              body: "Go to bed and wake up at the same time every day, even on weekends. This consistency anchors your body's circadian rhythm, making it naturally easier to fall asleep and wake up feeling refreshed. A relaxing wind-down ritual, like reading a book, can also help.",
            },
          },
          "section-3": {
            widgetType: "featureCard",
            data: {
              title: "Be Mindful of Light & Diet",
              body: "Get bright sunlight exposure in the morning to promote wakefulness. In the evening, avoid blue light from screens for at least an hour before bed. Also, avoid caffeine after 2 PM, and steer clear of large meals or alcohol right before you turn in for the night.",
            },
          },
        },
      },
      {
        slideNumber: 8,
        heading: "Prioritize Your Sleep, Elevate Your Life",
        layoutId: "title",
        content: {
          "main-title": {
            widgetType: "heading",
            data: {
              content: "Invest in Rest, Invest in Yourself",
              level: 1,
            },
          },
          subtitle: {
            widgetType: "paragraph",
            data: {
              content:
                "Sleep is not a luxury; it is a biological necessity that forms the foundation of good health, happiness, and productivity. By making small, consistent changes, you can fundamentally improve your life. Thank you.",
            },
          },
        },
      },
    ],
  };
  return (
    <>
      <Presentation presentationData={presentationData} />
    </>
  );
}
