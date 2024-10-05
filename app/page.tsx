"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import { ArrowDown, Sun, Moon, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import Link from "next/link"

const RotatingBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-purple-500 opacity-10 blur-[100px]"></div>
    </div>
  )
}

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: { duration: 10 + Math.random() * 20, repeat: Infinity },
          }}
        />
      ))}
    </div>
  )
}

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -100])
  
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center text-center p-4"
      style={{ y }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Our Visual Wonderland
      </motion.h1>
      <motion.p
        className="text-xl mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Explore a world of stunning visuals and smooth animations. Scroll down to discover more!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link href={'/chatbot'}>
        <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Get Started
        </Button>
        </Link>
      </motion.div>
      <motion.div
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="h-8 w-8" />
      </motion.div>
    </motion.section>
  )
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
          <Icon className="h-6 w-6 text-purple-500" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

const FeaturesSection = () => {
  const features = [
    { title: "Responsive Design", description: "Looks great on any device", icon: Sun },
    { title: "Smooth Animations", description: "Buttery smooth transitions", icon: Moon },
    { title: "Customizable Themes", description: "Personalize your experience", icon: Github },
  ]
  
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-purple-50 dark:to-purple-900/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Amazing Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const TestimonialCard = ({ name, role, content, avatar }: TestimonialCardProps) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="italic">&ldquo;{content}&rdquo;</p>
      </CardContent>
    </Card>
  )
}

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Alice Johnson", role: "Designer", content: "The visual effects are mind-blowing!", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Bob Smith", role: "Developer", content: "Smooth animations make the experience delightful.", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Charlie Brown", role: "Product Manager", content: "Our users love the new interface!", avatar: "/placeholder.svg?height=40&width=40" },
  ]
  
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TechStack = () => {
  const techs = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"]
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="text-lg py-2 px-4">
                {tech}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © 2024 Visual Wonderland. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      <RotatingBackground />
      <FloatingParticles />
      <ScrollProgress />
      
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <TechStack />
      </main>
      
      <Footer />
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 rounded-full"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent side="left">
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}