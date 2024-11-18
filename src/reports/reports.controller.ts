import { Controller } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Coach, UserGuard } from 'src/app.guards';
import { DashboardCardsReportResponse } from './responses.responses';
import { ApiSignature } from '@app/toolkit';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @ApiSignature({
    method: 'GET',
    path: '/dashboard-cards-count',
    summary: 'get dashboard cards count',
  })
  @ApiResponse({ status: 200, type: DashboardCardsReportResponse })
  @UserGuard()
  async dashboardCards(@Coach() _: IUser): Promise<DashboardCardsReportResponse> {
    return {
      reports: await this.service.dashboardCards(),
    };
  }
}
