// ─── Site-wide metadata and business info ─────────────────────────────────────
export const siteConfig = {
  name: "Sindhole Polymers",
  tagline: "Where every window starts with the right profile.",
  description:
    "Sindhole Polymers is an authorised dealer of Greentech uPVC window & door profile systems in Bidar, Karnataka. Serving fabricators, contractors, and developers across North Karnataka.",
  url: "https://polymers.sindhole.com",

  // Contact — keep in sync with .env for the form handler destination
  phone: "+91 93919 05091",
  phoneTel: "+919391905091",
  whatsapp: "https://wa.me/919391905091",
  whatsappPrefilled:
    "https://wa.me/919391905091?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Greentech%20uPVC%20profiles.",
  email: "polymers@sindhole.com",

  // Address
  address: {
    street: "Manahalli Road, Basaveshwara Nagar",
    city: "Bidar",
    state: "Karnataka",
    postalCode: "585403",
    country: "IN",
    plusCode: "VGW8+FGG",
    mapsUrl: "https://maps.app.goo.gl/8QN8vBpzAieTppRc8",
    geoLat: 17.918, // approximate from Plus Code VGW8+FGG, Bidar
    geoLng: 76.921,
  },

  // Hours — update when confirmed
  hours: {
    display: "Mon–Sat, 10:00 AM – 5:00 PM",
    sundayClosed: true,
    schema: [
      { dayOfWeek: "Monday", opens: "10:00", closes: "17:00" },
      { dayOfWeek: "Tuesday", opens: "10:00", closes: "17:00" },
      { dayOfWeek: "Wednesday", opens: "10:00", closes: "17:00" },
      { dayOfWeek: "Thursday", opens: "10:00", closes: "17:00" },
      { dayOfWeek: "Friday", opens: "10:00", closes: "17:00" },
      { dayOfWeek: "Saturday", opens: "10:00", closes: "17:00" },
    ],
  },

  // Region served — target both Kalaburagi AND Gulbarga spellings for local SEO
  regionsServed: ["Bidar", "Kalaburagi", "Gulbarga", "North Karnataka", "Basavakalyan", "Bhalki"],

  // Social (add when available)
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },

  // Company info (add GST/CIN when confirmed)
  company: {
    established: "2025",
    gst: "", // placeholder — add when confirmed
    cin: "", // placeholder
    registeredAs: "Sindhole Polymers",
  },
};
