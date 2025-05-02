import AboutHero from "../components/AboutPage/AboutHero";
import ServiceBenefits from "../components/AboutPage/ServiceBenefits";
import Stats from "../components/AboutPage/stats";
import TeamMembers from "../components/AboutPage/TeamMembers";

const AboutPage = () => {
    return (
      <div className="max-w-[1250px] mx-auto">
        
        <AboutHero />
        <Stats />
        <TeamMembers />
        <ServiceBenefits />
      </div>
    );
  };
  
  export default AboutPage;