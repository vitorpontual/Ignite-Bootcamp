import { container } from "tsyringe"
import { LocalStorageProvider } from "./implements/LocalStorageProvider"
import { S3StorageProvider } from "./implements/S3StorageProvider"
import { IStorageProvider } from "./IStorageProvider"


const diksStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diksStorage[process.env.disk]
)
