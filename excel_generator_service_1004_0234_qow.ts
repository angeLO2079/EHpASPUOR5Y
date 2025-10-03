// 代码生成时间: 2025-10-04 02:34:19
import { Injectable } from '@apollo/runtime-core';
import { ApolloInput, ApolloOutput, ApolloProcedure } from '@apollo/procedure';
import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

// Define a structure for the Excel generation request
interface ExcelGenerationRequest extends ApolloInput {
  data: any[][]; // 2D array of data to populate the Excel file
  fileName: string; // The name of the Excel file
}

// Define a structure for the Excel generation response
interface ExcelGenerationResponse extends ApolloOutput {
  success: boolean;
  message: string;
}

@Injectable()
class ExcelGeneratorService {
  // Procedure for generating Excel files
  @ApolloProcedure('generateExcel')
  public async generateExcel(request: ExcelGenerationRequest): Promise<ExcelGenerationResponse> {
    try {
      // Initialize the Excel workbook
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Sheet1');

      // Add data to the worksheet
      worksheet.addRows(request.data);

      // Path to save the Excel file
      const filePath = path.join(process.cwd(), request.fileName);

      // Write the workbook to a file
      await workbook.xlsx.writeFile(filePath);

      return {
        success: true,
        message: `Excel file generated successfully and saved at ${filePath}`
      };
    } catch (error) {
      // Handle errors
      console.error('Error generating Excel file:', error);
      return {
        success: false,
        message: `Failed to generate Excel file: ${error.message}`
      };
    }
  }
}

export default ExcelGeneratorService;