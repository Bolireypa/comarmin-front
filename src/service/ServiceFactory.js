import { UsersService } from './userService/user.service'
import { AuthService } from './authService/auth.service'
import { CompaniesService } from './companyService/company.service'
import { DriversService } from './driverService/driver.service'
import { PartnersService } from './partnerService/partner.service'
import { VehiclesService } from './vehicleService/vehicle.service'
import { OreOutletsService } from './oreOutletService/oreOutlet.service'
import { ReportsService } from './reportService/report.service'
import { PricingService } from './pricingService/pricing.service'
// import { SecurityMeasuresService } from './security-measures/securityMeasures.service'
// import { BarMembersService } from './bar-members/bar-members.service'
// import { ProductsService } from './products/products.service'
// import { BarAreasService } from './bar-areas/bar-areas.service'
// import { ProductCategoriesService } from './product-categories/product-categories.service'
// import { CitiesService } from './cities/cities.service'
// import { MenuReportService } from './menu-report/report.service'
// import { BookingsService } from './bookings/bookings.service'
// import { TablesService } from './tables/tables.service'
// import { DiscountsService } from './discounts/discounts.service'
// import { BookingsReportService } from './bookings-report/bookings-report.service'
// import { UsersReportService } from './users-report/user-report.service'


const Services = {
  // AuthService,
  // BillingPlansService,
  // BusinessTypesService,
  // ModulesService,
  // BarsService,
  // SecurityMeasuresService,
  // BarMembersService,
  // ProductsService,
  // BarAreasService,
  // ProductCategoriesService,
  // CitiesService,
  // MenuReportService,
  // BookingsService,
  PricingService,
  ReportsService,
  OreOutletsService,
  VehiclesService,
  PartnersService,
  DriversService,
  UsersService,
  AuthService,
  CompaniesService
}

export const ServiceFactory = {
  get: name => Services[name]
}
