import fs from 'fs';
import path  from 'path';

export const moveToPermanentFiles = async (links: string, newlinks: string) => {

  const old_links = (`./${links}`);
  const new_links = (`./${path.dirname(links)}/${newlinks}/${path.basename(links).replace('-tmp-', '-')}`).replace('/tmp/', '/')
  const new_links_dir = (`./${path.dirname(links)}/${newlinks}`).replace('/tmp/', '/');

  if (!fs.existsSync(new_links_dir)){
    fs.mkdirSync(new_links_dir);
  }

  fs.rename( old_links, new_links, (err) => {
    if (err) {
      console.error(err);
    }
  });

  // remove directory tmp after 00:00 pm to 01:00 am
  // const date = new Date();
  // const hour = date.getHours();
  // if (hour >= 0 && hour <= 1) {
  //   fs.rmSync(path.dirname(old_links), { recursive: true, force: true });
  // }

  return new_links.replace('./', '');
};

export const deleteFiles = (links: string) => {
  fs.unlink(`./${links}`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

export const deleteTempFiles = (links: string) => {
  fs.readdir(links, (err, files) => {
    if (err) {
      console.error(err);
    }
    for (const file of files) {
      fs.unlink(path + '/' + file, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
}