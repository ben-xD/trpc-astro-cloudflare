-- Apply with `wrangler d1 execute trpc-astro-cloudflare-template --file=./sql/schema.sql` / --local doesn't seem to work
-- Or you can run queries directly: `wrangler d1 execute <DATABASE_NAME> --local --command='SELECT * FROM Customers'`

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (UserID TEXT, name TEXT, bio TEXT, PRIMARY KEY (`UserID`));

-- INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');
