import Papa from "papaparse";
import * as XLSX from "xlsx";

/**
 * Parse CSV file into quiz data format
 * @param {File} file - The CSV file to parse
 * @returns {Promise<Object>} - A data object array of quiz questions
 */
export const parseCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvText = e.target.result;
      const allRows = csvText.split(/\r\n|\n/);

      if (allRows.length < 2) {
        reject(new Error("CSV file must have at least two rows"));
        return;
      }

      const headerRow = allRows[1];
      const adjustedCsvContent = [headerRow, ...allRows.slice(2)].join("\n");

      Papa.parse(adjustedCsvContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const questions = results.data.map((row) => ({
              question: row.question,
              options: [
                row.option1,
                row.option2,
                row.option3,
                row.option4,
              ].filter(Boolean),
              correctOption: parseInt(row.correctOption) - 1,
              points: row.points,
            }));

            resolve(questions);
          } catch (error) {
            reject(error);
          }
        },
        error: reject,
      });
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
};

/**
 * Parse Excel file into quiz data format
 * @param {File} file - The Excel file to parse
 * @returns {Promise<Object>} - A data object array of quiz questions
 */
export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          range: 1,
          header: "A",
        });

        const questions = jsonData.map((row) => ({
          question: row.question,
          options: [row.option1, row.option2, row.option3, row.option4].filter(
            Boolean,
          ),
          correctOption: parseInt(row.correctOption) - 1,
          points: row.points,
        }));

        resolve(questions);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
