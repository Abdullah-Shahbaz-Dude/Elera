import TeamMemberCard from '@/components/TeamMemberCard/TeamMemberCard';
import { teamMembers } from '@/data/teamMembers';
import Footer from '@/components/Footer/Footer';

const WhoWeAre = () => {
  return (
    <main className="min-h-screen pt-20 sm:pt-32 md:pt-40">
      <section className="relative w-full overflow-hidden bg-black py-8 sm:py-12 md:py-24 lg:py-32">
        {/* Background Glow Effects - Responsive sizes */}
        <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] md:h-[800px] md:w-[800px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[200px] sm:blur-[300px] md:blur-[400px]"></div>
        <div className="absolute left-1/4 bottom-1/4 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] md:h-[800px] md:w-[800px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[200px] sm:blur-[300px] md:blur-[400px]"></div>

        <div className="relative container mx-auto px-4 sm:px-5 md:px-6 z-10">
          <div className="mx-auto max-w-[1960px]">
            {/* Hero Section */}
            <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center">
              <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                Who We Are
              </h1>
              <div
                className="mx-auto h-1 w-24 sm:w-28 md:w-32 rounded-full"
                style={{
                  background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                }}
              ></div>
            </div>

            {/* Team Grid */}
            <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  name={member.name}
                  image={member.image}
                  initials={member.initials}
                  passions={member.passions}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default WhoWeAre;
