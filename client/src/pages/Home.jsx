import HeroSection from '../components/home/HeroSection'
import FeatureSection from '../components/home/FeatureSection'
import BenefitsSection from '../components/home/BenefitsSection'
import CTASection from '../components/home/CTASection'

const Home = () => {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <HeroSection />
            <FeatureSection />
            <BenefitsSection />
            <CTASection />
        </div>
    )
}

export default Home