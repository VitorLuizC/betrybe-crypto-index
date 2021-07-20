import fs from 'fs';

export type AuthInfo = {
  email: string;
  password: string;
};

function readDatabase(): Promise<AuthInfo[] | null> {
  return new Promise((resolve, reject) => {
    fs.readFile('./constants/auth.json', 'utf8', function (err, data) {
      if (err) reject(err);

      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(null);
      }
    });
  });
}

export default readDatabase;
