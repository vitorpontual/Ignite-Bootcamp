import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import {IMailProvider} from "./MailProvider/IMailProvider";
import {EtherealMailProvider} from "./MailProvider/implements/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider );

container.registerInstance<IMailProvider>(
  "EtherealProvider",
  new EtherealMailProvider()
)
