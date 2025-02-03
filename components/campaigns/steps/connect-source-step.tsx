import Image from "next/image"

interface PlatformCardProps {
  name: string
  description: string
  icon: string
  onClick: () => void
}

const platforms = {
  ads: [
    {
      name: "Meta Ads",
      description: "Call Leads as soon as they Sign Up to Your Campaign",
      icon: "https://v0.dev/meta-logo.svg",
    },
    {
      name: "Google Ads",
      description: "Turn Interest into Appointments",
      icon: "https://v0.dev/google-logo.svg",
    },
    {
      name: "LinkedIn Ads",
      description: "The best place for B2B professionals",
      icon: "https://v0.dev/linkedin-logo.svg",
    },
  ],
  forms: [
    {
      name: "Tally Forms",
      description: "Simple and powerful forms",
      icon: "https://v0.dev/tally-logo.svg",
    },
    {
      name: "Typeform Forms",
      description: "Conversational forms",
      icon: "https://v0.dev/typeform-logo.svg",
    },
    {
      name: "Google Forms",
      description: "Easy to use forms",
      icon: "https://v0.dev/google-forms-logo.svg",
    },
  ],
}

function PlatformCard({ name, description, icon, onClick }: PlatformCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-6 bg-[#ffffff]/5 rounded-lg hover:bg-[#ffffff]/10 transition-colors text-center group"
    >
      <div className="mb-4 w-16 h-16 flex items-center justify-center">
        <Image
          src={icon || "/placeholder.svg"}
          alt={name}
          width={48}
          height={48}
          className="group-hover:scale-110 transition-transform"
        />
      </div>
      <h3 className="text-lg font-semibold text-[#ffffff] mb-2">{name}</h3>
      <p className="text-sm text-[#e7e7e7]">{description}</p>
    </button>
  )
}

export default function Home() {
  return (
    <div className="bg-[#1e1e1e] min-h-screen flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(platforms).map(([category, platforms]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <PlatformCard
                  key={platform.name}
                  name={platform.name}
                  description={platform.description}
                  icon={platform.icon}
                  onClick={() => {
                    console.log(`Clicked on ${platform.name}`)
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

