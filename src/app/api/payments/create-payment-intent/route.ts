import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { documentId, amount } = await request.json()

    if (!documentId || !amount) {
      return NextResponse.json(
        { error: "Document ID and amount are required" },
        { status: 400 }
      )
    }

    // Check if document exists
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Check if user already purchased this document
    const existingPurchase = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        documentId: documentId,
        status: "COMPLETED"
      }
    })

    if (existingPurchase) {
      return NextResponse.json(
        { error: "Document already purchased" },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: session.user.id,
        documentId: documentId,
      },
    })

    // Create payment record in database
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        documentId: documentId,
        amount: amount,
        status: "PENDING",
        stripePaymentId: paymentIntent.id,
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Create payment intent error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}