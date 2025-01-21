/* eslint-disable @typescript-eslint/no-explicit-any */
// app/newsletter/NewsletterPageClient.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default function NewsletterPageClient({
  newsletters,
}: {
  newsletters: any;
}) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const { toast } = useToast()

  const handleSubscribe = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const substackUrl = "https://thesundaydigest.substack.com/";
      window.location.href = `${substackUrl}?email=${encodeURIComponent(email)}`;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 md:h-96">
            <Image
              src="/newsletter.jpg"
              alt="Newsletter hero"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Stay ahead in tech with our weekly insights
            </h1>
            <p className="text-xl text-gray-600">
              Join thousands of developers getting the latest in web
              development, straight to their inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <Button type="submit" disabled={isSubmitting}>
                  <Mail className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                By subscribing, you agree to our privacy policy and terms of
                service. We&apos;ll send you weekly newsletters and important
                updates.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Issues */}
      <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Previous Issues</h2>
      <div className="space-y-6">
        {newsletters.map((issue: any) => (
          <Link
            key={issue._id}
            href={`/newsletter/${issue.slug.current}`}
            className="block"
          >
            <Card className="transition-all hover:shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {issue.coverImage && (
                  <div className="lg:w-1/3">
                    <Image
                      src={issue.coverImage.url}
                      alt={issue.coverImage.alt || `Cover image for ${issue.title}`}
                      className="h-48 lg:h-full w-full object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl text-blue-500 hover:text-blue-600 transition-colors">
                          {issue.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-gray-500 mt-2">
                          <Calendar className="h-4 w-4" />
                          <time>{formatDate(issue.publishedAt)}</time>
                        </div>
                      </div>
                      <Button variant="ghost" className="self-start">
                        Read Issue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  {issue.description && (
                    <CardContent className="p-0">
                      <p className="text-gray-600 line-clamp-2">
                        {issue.description}
                      </p>
                    </CardContent>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
    </div>
  );
}
