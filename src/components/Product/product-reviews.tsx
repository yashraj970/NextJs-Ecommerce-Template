"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface ProductReviewsProps {
  productId: number;
  rating: number;
  reviewCount: number;
}

export default function ProductReviews({
  productId,
  rating,
  reviewCount,
}: ProductReviewsProps) {
  // This would be replaced with actual data from your API
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-10-15",
      title: "Exceptional quality and comfort",
      content:
        "I absolutely love this jacket! The leather is butter-soft and the craftsmanship is outstanding. It fits true to size and the details are perfect. Worth every penny.",
      helpful: 24,
      unhelpful: 2,
      verified: true,
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-09-28",
      title: "Great jacket with minor issues",
      content:
        "The quality of the leather is excellent and the style is exactly as pictured. My only complaint is that the zipper feels a bit flimsy. Otherwise, it's a fantastic jacket that I've received many compliments on.",
      helpful: 15,
      unhelpful: 3,
      verified: true,
    },
    {
      id: 3,
      author: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-11-02",
      title: "Perfect fit and amazing quality",
      content:
        "This jacket exceeded my expectations. The leather is soft yet durable, and the fit is perfect. I've worn it in light rain and it held up great. Highly recommend!",
      helpful: 18,
      unhelpful: 0,
      verified: true,
    },
  ];

  const ratingCounts: Record<number, number> = {
    5: 84,
    4: 26,
    3: 10,
    2: 3,
    1: 1,
  };

  const [helpfulReviews, setHelpfulReviews] = useState<
    Record<number, boolean | null>
  >({});

  const handleHelpful = (reviewId: number, isHelpful: boolean) => {
    setHelpfulReviews((prev) => ({
      ...prev,
      [reviewId]: isHelpful ? true : prev[reviewId] === false ? null : false,
    }));
  };

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="text-5xl font-bold mb-2">{rating.toFixed(1)}</div>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Based on {reviewCount} reviews
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium mb-4">Rating Breakdown</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <div className="w-12 text-sm">{star} stars</div>
                <div className="flex-1 mx-3">
                  <Progress
                    value={(ratingCounts[star] / reviewCount) * 100}
                    className="h-2"
                  />
                </div>
                <div className="w-10 text-sm text-right">
                  {ratingCounts[star]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review CTA */}
        <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center text-center">
          <MessageSquare className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-medium mb-2">Share Your Thoughts</h3>
          <p className="text-sm text-gray-600 mb-4">
            Help other customers make their decision
          </p>
          <Button>Write a Review</Button>
        </div>
      </div>

      {/* Reviews List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={review.avatar} alt={review.author} />
                    <AvatarFallback>
                      {review.author.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {review.verified && (
                        <span className="ml-2 text-emerald-600">
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.content}</p>

              <div className="flex items-center text-sm">
                <div className="mr-6">Was this review helpful?</div>
                <button
                  className={`flex items-center mr-4 ${
                    helpfulReviews[review.id] === true
                      ? "text-primary font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => handleHelpful(review.id, true)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>
                    {review.helpful +
                      (helpfulReviews[review.id] === true ? 1 : 0)}
                  </span>
                </button>
                <button
                  className={`flex items-center ${
                    helpfulReviews[review.id] === false
                      ? "text-primary font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => handleHelpful(review.id, false)}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  <span>
                    {review.unhelpful +
                      (helpfulReviews[review.id] === false ? 1 : 0)}
                  </span>
                </button>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          <div className="text-center mt-8">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </TabsContent>

        <TabsContent value="positive" className="space-y-6">
          {reviews
            .filter((r) => r.rating >= 4)
            .map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                {/* Same review structure as above */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback>
                        {review.author.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.author}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {review.verified && (
                          <span className="ml-2 text-emerald-600">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h4 className="font-medium mb-2">{review.title}</h4>
                <p className="text-gray-700 mb-4">{review.content}</p>

                <div className="flex items-center text-sm">
                  <div className="mr-6">Was this review helpful?</div>
                  <button
                    className={`flex items-center mr-4 ${
                      helpfulReviews[review.id] === true
                        ? "text-primary font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleHelpful(review.id, true)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>
                      {review.helpful +
                        (helpfulReviews[review.id] === true ? 1 : 0)}
                    </span>
                  </button>
                  <button
                    className={`flex items-center ${
                      helpfulReviews[review.id] === false
                        ? "text-primary font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleHelpful(review.id, false)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>
                      {review.unhelpful +
                        (helpfulReviews[review.id] === false ? 1 : 0)}
                    </span>
                  </button>
                </div>
              </div>
            ))}
        </TabsContent>

        <TabsContent value="critical" className="space-y-6">
          {reviews.filter((r) => r.rating < 4).length > 0 ? (
            reviews
              .filter((r) => r.rating < 4)
              .map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-0"
                >
                  {/* Same review structure as above */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={review.avatar} alt={review.author} />
                        <AvatarFallback>
                          {review.author.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          {review.verified && (
                            <span className="ml-2 text-emerald-600">
                              ✓ Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-700 mb-4">{review.content}</p>

                  <div className="flex items-center text-sm">
                    <div className="mr-6">Was this review helpful?</div>
                    <button
                      className={`flex items-center mr-4 ${
                        helpfulReviews[review.id] === true
                          ? "text-primary font-medium"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => handleHelpful(review.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>
                        {review.helpful +
                          (helpfulReviews[review.id] === true ? 1 : 0)}
                      </span>
                    </button>
                    <button
                      className={`flex items-center ${
                        helpfulReviews[review.id] === false
                          ? "text-primary font-medium"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => handleHelpful(review.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      <span>
                        {review.unhelpful +
                          (helpfulReviews[review.id] === false ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No critical reviews yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
