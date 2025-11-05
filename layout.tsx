/**
 * ESG Guardian Template Layout
 *
 * Planet positive, governance privilege, future-responsible
 * Structure: Impact metrics hero, ESG priorities grid, sustainability report hub
 */

import ComponentComposer from "@/components/ir/composition/ComponentComposer";
import { ComponentClusters } from "@/components/ir/composition/component-config";
import { prepareComponentData } from "@/lib/component-data-helpers";
import type { Company } from "@prisma/client";

// Type aliases for Template and Theme (until Prisma Client regenerates)
type Template = any;
type Theme = any;

interface ESGGuardianLayoutProps {
  company: Company & {
    pressReleases?: any[];
  };
  template: Template | null;
  theme: Theme | null;
}

export default async function ESGGuardianLayout({
  company,
  template,
  theme,
}: ESGGuardianLayoutProps) {
  // Prepare base component data from company (with CMS integration)
  const baseData = await prepareComponentData(company, true);

  // Merge with ESG Guardian specific data
  const componentData = {
    ...baseData,
    metrics: {
      ...baseData.metrics,
      co2: "45%",
      community: "$2.5M",
      diversity: "60%",
    },
    pillars: [
      {
        id: "environmental",
        title: "Environmental",
        description:
          "Our commitment to reducing environmental impact through sustainable practices and renewable energy initiatives.",
      },
      {
        id: "social",
        title: "Social",
        description:
          "Building inclusive communities, supporting diversity, and creating positive social impact through our operations.",
      },
      {
        id: "governance",
        title: "Governance",
        description:
          "Strong ethical leadership, transparent reporting, and accountable governance structures that drive long-term value.",
      },
    ],
    esg: {
      metrics: {
        co2Reduction: "45%",
        communityImpact: "$2.5M invested",
        boardDiversity: "60% diverse representation",
        energyUsage: "100% renewable",
        wasteReduction: "85% reduction",
      },
      priorities: [
        {
          id: "climate",
          category: "Environmental" as const,
          title: "Climate Action",
          description:
            "Net-zero emissions by 2030 through renewable energy transition and carbon offset programs.",
        },
        {
          id: "diversity",
          category: "Social" as const,
          title: "Diversity & Inclusion",
          description:
            "Building diverse teams and inclusive workplaces that reflect the communities we serve.",
        },
        {
          id: "governance",
          category: "Governance" as const,
          title: "Ethical Governance",
          description:
            "Transparent reporting, ethical leadership, and strong corporate governance practices.",
        },
      ],
      certifications: [
        {
          id: "bcorp",
          name: "B Corporation",
          issuer: "B Lab",
          date: "2023",
        },
        {
          id: "carbon-neutral",
          name: "Carbon Neutral",
          issuer: "Carbon Trust",
          date: "2024",
        },
      ],
    },
    governance: {
      ...baseData.governance,
      // Board members are already fetched from CMS in baseData (leaders filtered by role)
      committees: [
        {
          id: "sustainability",
          name: "Sustainability Committee",
          description:
            "Oversees environmental initiatives and sustainability reporting.",
        },
        {
          id: "diversity",
          name: "Diversity & Inclusion Committee",
          description:
            "Promotes diversity, equity, and inclusion across the organization.",
        },
      ],
      policies: [],
    },
  };

  // Get component configuration for ESG Guardian template
  const components = ComponentClusters.esgGuardian(componentData);

  // Apply theme styles
  const primaryColor = (theme?.colors as any)?.primary || "#065F46";
  const accentColor = (theme?.colors as any)?.accent || "#10B981";
  const backgroundColor = (theme?.colors as any)?.background || "#F0FDF4";
  const textColor = (theme?.colors as any)?.text || "#1F2937";
  const primaryFont =
    (theme?.typography as any)?.primaryFont ||
    (company as any).primaryFontFamily ||
    "Lora";
  const secondaryFont =
    (theme?.typography as any)?.secondaryFont ||
    (company as any).secondaryFontFamily ||
    primaryFont;

  return (
    <div
      className="ir-site esg-guardian"
      style={{
        backgroundColor,
        color: textColor,
        fontFamily: primaryFont,
        minHeight: "100vh",
      }}
    >
      {/* Theme CSS Variables */}
      <style>{`
        :root {
          --primary-color: ${primaryColor};
          --accent-color: ${accentColor};
          --background-color: ${backgroundColor};
          --text-color: ${textColor};
          --primary-font: ${primaryFont};
          --secondary-font: ${secondaryFont};
        }
      `}</style>

      {/* Header */}
      <header
        className="border-b sticky top-0 z-50 bg-white"
        style={{ borderColor: `${primaryColor}20`, backgroundColor }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {company.logoUrl && (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} Logo`}
                  className="h-12"
                />
              )}
              <h1
                className="text-2xl font-bold"
                style={{ color: primaryColor }}
              >
                {company.name}
              </h1>
            </div>
            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <a
                    href="#esg"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    ESG
                  </a>
                </li>
                <li>
                  <a
                    href="#sustainability"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Sustainability
                  </a>
                </li>
                <li>
                  <a
                    href="#governance"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Governance
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Render components using ComponentComposer */}
      <ComponentComposer
        template={template}
        theme={theme}
        company={company}
        components={components}
      />
    </div>
  );
}
