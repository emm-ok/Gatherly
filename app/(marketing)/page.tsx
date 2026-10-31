import { LandingNavbar } from "@/components/marketing/landing-navbar";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingFeatures } from "@/components/marketing/landing-features";
import { LandingBenefits } from "@/components/marketing/landing-benefits";
import { LandingHowItWorks } from "@/components/marketing/landing-how-it-works";
import { LandingCta } from "@/components/marketing/landing-cta";
import { LandingFooter } from "@/components/marketing/landing-footer";

export default function HomePage() {
    return (
        <>
            <LandingNavbar />

            <main>
                <LandingHero />
                <LandingFeatures />
                <LandingBenefits />
                <LandingHowItWorks />
                <LandingCta />
            </main>

            <LandingFooter />
        </>
    );
}