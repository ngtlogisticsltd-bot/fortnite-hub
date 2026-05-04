import { NextResponse } from "next/server";
import { getProfile, setProfile, getNextStep } from "@/lib/controlCore/profile";
import { getVaultStatus, getSafePublicConfig } from "@/lib/vault/envVault";

export async function GET() {
  const status = getVaultStatus();
  return NextResponse.json({
    profile: getProfile(),
    vault: status,
    public: getSafePublicConfig(),
    next: getNextStep(status)
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    setProfile(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }
}
