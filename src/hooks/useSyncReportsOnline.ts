import { Report } from "../components/homeComponents/ReportInterface";
import {
  removeReportOffline,
  saveReportOffilne,
} from "./useSyncReportsOffline";
import { SeverityEnum } from "@//constants/severityEnum";
import { StatusEnum, StatusEnumType } from "@//constants/statusEnum";
import requestHTPP from "@/utils/requestAxios";
import useAsyncStorage from "@/hooks/useSyncStorage";

const useSyncReportsOnline = () => {
  const { GET, POST_FormData } = requestHTPP();
  const { getTokens } = useAsyncStorage();
  const getStatusReportOn = async (report: Report) => {
    let status: StatusEnumType | undefined = StatusEnum.REPORTADO;
    try {
      console.log(`Obtendo dados do Report: id->[${report.id}]`);

      const url = `/report/status/address/${report.address}/geohash/${report.geohash}`;
      const response = await GET(url);
      console.log("res -> ", response?.data);
      if (!response) return;
      status = response?.data.status;
    } catch (error) {
      console.error("[DATABASE] error: ", error);
    } finally {
      return status;
    }
  };

  const saveReportOnline = async (report: Report) => {
    try {
      console.log("Enviando Report");
      const formData = new FormData();

      const data = {
        coordinates: {
          latitude: report.coodenates?.latitude,
          longitude: report.coodenates?.longitude,
        },
        subregion: report.subregion,
        district: report.district,
        street: report.street,
        severity: SeverityEnum[report.severity],
      };
      // Adiciona os outros dados do relatório

      if (typeof report.image === "string") {
        // Extrai o nome do arquivo a partir da URI
        const filename = report.image.substring(
          report.image.lastIndexOf("/") + 1
        );
        const ext = filename.split(".")[1];

        formData.append("data", JSON.stringify(data));
        // Adiciona a imagem ao FormData
        formData.append("file", {
          uri: report.image, // Caminho do arquivo
          name: filename, // Nome do arquivo
          type: `image/${ext}`, // Tipo MIME baseado na extensão
        } as any);
      } else {
        throw new Error("No valid image provided.");
      }
      // Envia os dados para o Xano
      const response = await POST_FormData(`/report`, formData);

      if (!response) return;
      console.log("[DATABASE]: ", JSON.stringify(response.data));

      const newReport = report;
      await removeReportOffline(report.id);
      newReport.submit = true;
      // newReport.id = response?.data.report.id;   // verdadeiro id do report pai para acoplar no report
      newReport.id = response?.data.report.falseId;
      newReport.address = response?.data.report.address;
      newReport.geohash = response?.data.report.geohash;
      await saveReportOffilne(newReport);
      return true;
    } catch (error: any) {
      console.error("Erro ao enviar relatório:", error.response?.data || error);
    }
  };

  return {
    saveReportOnline,
    getStatusReportOn,
  };
};

export default useSyncReportsOnline;
