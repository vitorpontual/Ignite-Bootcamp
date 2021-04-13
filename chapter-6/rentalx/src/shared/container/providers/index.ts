import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import {IMailProvider} from "./MailProvider/IMailProvider";
import {EtherealMailProvider} from "./MailProvider/implements/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implements/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implements/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";



container.registerSingleton<IDateProvider>(
  "DayjsDateProvider", 
  DayjsDateProvider 
  );

container.registerInstance<IMailProvider>(
  "EtherealProvider",
  new EtherealMailProvider()
)

const diksStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diksStorage[process.env.disk]
)
