import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon } from "lucide-react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";





const page = async () => {

  const session = await getServerSession(authOptions)
  if(!session) {
    return null
  }
  const email = session?.user?.email;
  if (!email) {
    return null;
  }
  const checkSubscriptionPlan = prisma.user.findMany({
    where: {
      email: email,
    },
    select:{
      stripe_customer_id: true,
    }
  })

  const pricingOptions = [
    {
      title: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["5 chapter generations per month", "Basic support"],
      limitations: ["No access to premium features"],
      buttonText: "Get started",
      popular: false,
    },
    {
      title: "Pro plan",
      price: "$5",
      description: "For regular uploaders",
      features: ["40 chapter generations per month", "Priority support"],
      limitations: [],
      buttonText: `${await checkSubscriptionPlan ? 'You already have this plan' : 'Buy This plan'}`,
      popular: true,
    },
  ];
  
  return (
    <MaxWidthWrapper className="py-24 min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-xl text-muted-foreground">
          Choose the plan that works best for you. No hidden fees. Fair pricing.
        </p>
        <p className="text-xl text-muted-foreground">
          *Maximum video length is 1 hour for all plans*
        </p>
      </div>
      <div className="flex justify-center items-center text-2xl font-bold mb-12">
        <span className="bg-primary/10 text-primary px-4 py-2 rounded-full">
          Billed monthly
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
        {pricingOptions.map((option, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden transition-all duration-300 ${
              option.popular
                ? "border-primary shadow-lg hover:shadow-xl"
                : "hover:border-primary/50 hover:shadow-md"
            }`}
          >
            {option.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="m-2 py-1.5 uppercase bg-primary text-primary-foreground">
                  Most popular
                </Badge>
              </div>
            )}
            <CardHeader className="text-center pb-8 pt-10">
              <CardTitle className="text-3xl font-bold mb-2">
                {option.title}
              </CardTitle>
              <span className="text-5xl font-extrabold">{option.price}</span>
              {option.price !== "Free" && (
                <span className="text-xl text-muted-foreground">/month</span>
              )}
            </CardHeader>
            <CardDescription className="text-center px-4 pb-4">
              {option.description}
            </CardDescription>
            <CardContent>
              <ul className="space-y-4 mb-8">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
                {option.limitations?.map((limitation, index) => (
                  <li key={index} className="flex items-center">
                    <XIcon className="w-4 h-4 mr-2 text-red-500" />
                    {limitation}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full py-6 text-lg ${
                  option.popular
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                }`}
              >
                {option.buttonText} 
                {
                  !session && 'You must be logged in to purchase a plan' 
                }
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default page;