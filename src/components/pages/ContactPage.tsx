"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(20, "Please provide more detail (at least 20 characters)"),
});

type FormData = z.infer<typeof schema>;

const contactMethods = [
  { icon: Mail, label: "Email Us", value: "hello@automatex.ai", sub: "Response within 2 hours" },
  { icon: Phone, label: "Call Us", value: "+1 (888) 123-4567", sub: "Mon-Fri, 9am-6pm EST" },
  { icon: Calendar, label: "Book a Call", value: "30-min Discovery Call", sub: "Free consultation, no commitment" },
  { icon: MapPin, label: "Offices", value: "New York · London · Berlin", sub: "Serving clients globally" },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, "leads"), {
        ...data,
        status: "new",
        source: "website",
        tags: [],
        value: 0,
        notes: data.message,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setSubmitted(true);
      reset();
      toast.success("Message sent! We'll be in touch within 2 hours.");
    } catch {
      toast.error("Something went wrong. Please email us directly at hello@automatex.ai");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">Get In Touch</p>
            <h1 className="text-4xl lg:text-6xl font-bold font-display">
              Let&apos;s build your <span className="gradient-text">AI future</span>
            </h1>
            <p className="text-lg text-muted-foreground">Book a free discovery call or fill out the form below — we&apos;ll get back to you within 2 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Left side info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactMethods.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.label} className="flex items-start gap-4 glass-card border border-border/50 rounded-xl p-4">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                          <p className="text-sm font-semibold">{m.value}</p>
                          <p className="text-xs text-muted-foreground">{m.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card border border-border/50 rounded-2xl p-6 space-y-3">
                <h3 className="font-bold text-sm">What happens next?</h3>
                {[
                  "We review your submission within 2 hours",
                  "Schedule a 30-min discovery call",
                  "Receive a custom AI audit report",
                  "Get a detailed proposal with pricing",
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-400">{i + 1}</span>
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4 glass-card border border-border/50 rounded-3xl p-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-sm">We&apos;ll review your project and get back to you within 2 hours with next steps.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="glass-card border border-border/50 rounded-3xl p-8 space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="John Smith" {...register("name")} className={errors.name ? "border-destructive" : ""} />
                      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john@company.com" {...register("email")} className={errors.email ? "border-destructive" : ""} />
                      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company">Company *</Label>
                      <Input id="company" placeholder="Acme Inc." {...register("company")} className={errors.company ? "border-destructive" : ""} />
                      {errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 000-0000" {...register("phone")} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" placeholder="United States" {...register("country")} className={errors.country ? "border-destructive" : ""} />
                      {errors.country && <p className="text-xs text-destructive">{errors.country.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="service">Service Interested In *</Label>
                      <select id="service" {...register("service")} className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <option value="">Select a service</option>
                        <option value="ai-chatbots">AI Chatbots</option>
                        <option value="ai-agents">AI Agents</option>
                        <option value="workflow-automation">Workflow Automation</option>
                        <option value="crm-automation">CRM Automation</option>
                        <option value="lead-generation">Lead Generation</option>
                        <option value="custom-ai">Custom AI Solutions</option>
                        <option value="not-sure">Not Sure — Need Advice</option>
                      </select>
                      {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="budget">Budget Range *</Label>
                    <select id="budget" {...register("budget")} className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 – $15,000</option>
                      <option value="15k-30k">$15,000 – $30,000</option>
                      <option value="30k-plus">$30,000+</option>
                    </select>
                    {errors.budget && <p className="text-xs text-destructive">{errors.budget.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Tell us about your project *</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe what you're trying to automate, current challenges, and any specific requirements..."
                      rows={5}
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" /> Send Message</>
                    )}
                  </Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
