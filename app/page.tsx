import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import CertificationsSection from '@/components/CertificationsSection';
import ResearchSection from '@/components/ResearchSection';
import LeadershipSection from '@/components/LeadershipSection';
import CodingProfilesSection from '@/components/CodingProfilesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ResearchSection />
        <LeadershipSection />
        <CodingProfilesSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
