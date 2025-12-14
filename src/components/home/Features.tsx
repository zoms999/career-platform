"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Building2, Users, ArrowRight, LineChart, GraduationCap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BrainCircuit,
    title: "OCTO 진로적성검사",
    desc: "8가지 다중지능 이론을 기반으로 수집된 빅데이터를 분석하여 개인의 최적화된 진로를 제시합니다.",
    color: "bg-blue-100/50 text-blue-600",
  },
  {
    icon: Building2,
    title: "기업/기관용 솔루션",
    desc: "조직 구성원의 성향 분석을 통해 효율적인 팀 빌딩과 인재 배치를 돕는 HR 솔루션을 제공합니다.",
    color: "bg-indigo-100/50 text-indigo-600",
  },
  {
    icon: GraduationCap,
    title: "학교/교육기관 프로그램",
    desc: "학생들의 진로 탐색을 돕는 단체 검사 및 교육 프로그램을 운영합니다. 선생님을 위한 결과 리포트 제공.",
    color: "bg-purple-100/50 text-purple-600",
  },
];

export function Features() {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            모두를 위한 맞춤형 진로 솔루션
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            개인부터 학교, 기업까지 다양한 목적에 맞는 전문적인 진단 도구를 제공합니다.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow border border-slate-200/50 dark:border-slate-700/50 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {feature.desc}
              </p>
              <a href="#" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80">
                자세히 보기 <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
