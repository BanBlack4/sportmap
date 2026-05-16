import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

const clubs = [
  {
    name: "Club Deportivo Las Condes",
    sport: "fútbol",
    address: "Av. Las Condes 12345, Las Condes",
    latitude: -33.4073,
    longitude: -70.5735,
    phone: "+56 2 2345 6789",
    description:
      "Club de fútbol con canchas de pasto natural y artificial.",
    schedule: "Lun–Vie 8:00–22:00, Sáb–Dom 9:00–20:00",
  },
  {
    name: "Tenis Club Providencia",
    sport: "tenis",
    address: "Av. Providencia 890, Providencia",
    latitude: -33.4326,
    longitude: -70.6145,
    phone: "+56 2 2987 6543",
    description:
      "8 canchas de tenis en polvo de ladrillo y superficie dura.",
    schedule: "Lun–Dom 7:00–23:00",
  },
  {
    name: "Club Natación Olimpia",
    sport: "natación",
    address: "Calle Los Leones 456, Ñuñoa",
    latitude: -33.4567,
    longitude: -70.5983,
    phone: "+56 2 2111 2222",
    description:
      "Piscina olímpica semiolímpica y temperada todo el año.",
    schedule: "Lun–Vie 6:00–22:00, Sáb 7:00–20:00",
  },
  {
    name: "Gym & Crossfit Vitacura",
    sport: "crossfit",
    address: "Av. Vitacura 6700, Vitacura",
    latitude: -33.3941,
    longitude: -70.5784,
    phone: "+56 2 2333 4444",
    description:
      "Box de crossfit con entrenadores certificados.",
    schedule: "Lun–Vie 6:00–22:00, Sáb 8:00–14:00",
  },
  {
    name: "Club Básquetbol Santiago Centro",
    sport: "básquetbol",
    address: "Calle Agustinas 1200, Santiago",
    latitude: -33.4382,
    longitude: -70.6506,
    phone: "+56 2 2555 6666",
    description:
      "Canchas techadas de básquetbol y ligas amateur.",
    schedule: "Lun–Sáb 9:00–21:00",
  },
  {
    name: "Paddle Club La Reina",
    sport: "pádel",
    address: "Av. Ossa 1234, La Reina",
    latitude: -33.4501,
    longitude: -70.5521,
    phone: "+56 2 2777 8888",
    description:
      "4 canchas de pádel techadas con iluminación LED.",
    schedule: "Lun–Dom 7:00–23:00",
  },
  {
    name: "Yoga & Pilates Bellavista",
    sport: "yoga",
    address: "Constitución 234, Bellavista",
    latitude: -33.4286,
    longitude: -70.6398,
    phone: "+56 2 2999 0000",
    description:
      "Studio de yoga y pilates con vista a cerro San Cristóbal.",
    schedule: "Lun–Dom 7:00–21:00",
  },
  {
    name: "Club Ciclismo Maipú",
    sport: "ciclismo",
    address: "Av. Pajaritos 2345, Maipú",
    latitude: -33.5122,
    longitude: -70.7619,
    phone: "+56 2 2100 2003",
    description:
      "Velódromo y rutas de ciclismo de montaña.",
    schedule: "Lun–Dom 8:00–19:00",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.club.deleteMany();

  await prisma.club.createMany({
    data: clubs,
  });

  console.log(`✅ ${clubs.length} clubes creados`);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });