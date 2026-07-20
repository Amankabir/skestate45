"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface AboutTeamProps {
  team: readonly TeamMember[];
}

export function AboutTeam({ team }: AboutTeamProps) {
  return (
    <section
      id="team"
      className="section-pad bg-ivory"
      aria-labelledby="team-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Advisory Team"
          title="People behind the quiet confidence"
          description="Experienced advisors who listen first — then open the right doors."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <FadeIn key={member.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group overflow-hidden rounded-2xl bg-pearl shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-xl text-pearl">
                      {member.name}
                    </h3>
                    <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-champagne">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="p-5 text-sm leading-relaxed text-text-muted">
                  {member.bio}
                </p>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
