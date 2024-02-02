import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        /*
        ludia mozu menit udaje na klientovy, preto tu cez auth a server robim znovu validaciu udajov
        ziskam udaje z credentials
        */
        const validatedFields = LoginSchema.safeParse(credentials);

        /*
        ak mam ziskane udaje, vyberiem email/heslo
        */
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          /*
            overim, ci taky uzivatel s takym mailom sa v db nachadza, ak nie, nevrat nic, cize neprihlas
          */
          const user = await db.user.findUnique({ where: { email } });
          if (!user || !user.password) return null;
          /*
            ak sa v db nachadza, porovnaj heslo ktore zadal s hashnutym heslom z db
            **/
          const passwordsMatch = await bcrypt.compare(password, user.password);

          /*
        ak hesla suhlasia, prihlas uzivatela
        */
          if (passwordsMatch) return user;
        }
        /*
        nechaj vsetko prebehnut
        */
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
