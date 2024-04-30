import fs from 'fs';
import path  from 'path';

export const moveToPermanentFiles = async (links: string, newlinks: string = 'files') => {

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

  return new_links.replace('./', '');
};

export const deleteFiles = (links: string) => {
  fs.unlink(`./${links}`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

export const deleteFolder = (links: string) => {
  fs.rmdir(`./${path.dirname(links)}`, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

export const createFolder = (links: string) => {
  fs.mkdir(`./${links}`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

