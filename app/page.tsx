import Navbar from '@/components/Navbar';
import HeroSection from '@/components/NewHeroSection';
import ExperienceSection from '@/components/NewExperienceSection';
import ProjectsSection from '@/components/NewProjectsSection';
import SkillsSection from '@/components/NewSkillsSection';
import EducationSection from '@/components/EducationSection';
import CertificationsSection from '@/components/NewCertificationsSection';
import ResearchSection from '@/components/ResearchSection';
import CodingProfilesSection from '@/components/CodingProfilesSection';
import LeadershipSection from '@/components/NewLeadershipSection';
import ContactSection from '@/components/NewContactSection';
import Footer from '@/components/NewFooter';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ResearchSection />
        <CodingProfilesSection />
        <LeadershipSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

