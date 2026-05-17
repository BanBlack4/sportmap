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
   name:"Club Deportivo Las Condes",
   sport:"fútbol",
   address:"Av. Las Condes 12345, Las Condes",
   latitude:-33.4073,
   longitude:-70.5735,

   phone:"+56 2 2345 6789",

   description:"Club de fútbol con canchas de pasto natural y artificial.",

   hasParking:true,
   hasShower:true,

   scheduleData:{
      monday:"08:00-22:00",
      tuesday:"08:00-22:00",
      wednesday:"08:00-22:00",
      thursday:"08:00-22:00",
      friday:"08:00-22:00",
      saturday:"09:00-20:00",
      sunday:"09:00-20:00"
   }
}
];

async function main() {

  console.log("🌱 Seeding database...");

  await prisma.schedule.deleteMany();

  await prisma.club.deleteMany();

  for (const club of clubs) {
  await prisma.club.create({
    data: {
      name: club.name,
      sport: club.sport,
      description: club.description,
      address: club.address,
      latitude: club.latitude,
      longitude: club.longitude,
      phone: club.phone,

      hasParking: club.hasParking || false,
      hasShower: club.hasShower || false,
      hasStore: club.hasStore || false,
      hasTrainer: club.hasTrainer || false,

      priceMonthly: club.priceMonthly,

      scheduleData: club.scheduleData
        ? {
            create: club.scheduleData
          }
        : undefined
    }
  });
}

}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });