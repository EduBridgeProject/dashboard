import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Button,
} from "@material-tailwind/react";

export function Tables() {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/case/beneficiaries"
        );
        setBeneficiaries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to approve a beneficiary
  const handleApprove = async (id) => {
    try {
      // Send a PUT request to approve the beneficiary
      await axios.put(
        `http://localhost:4000/api/case/beneficiaries/${id}/approve`
      );

      // Update the state to reflect the change
      setBeneficiaries((prevBeneficiaries) =>
        prevBeneficiaries.map((beneficiary) =>
          beneficiary.id === id
            ? { ...beneficiary, approvedByAdmin: true }
            : beneficiary
        )
      );

      console.log("Beneficiary approved successfully");
    } catch (error) {
      console.error("Error approving beneficiary:", error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12" dir="rtl">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            جدول المستفيدين
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "المعرف",
                  "المستخدم",
                  "اسم الجامعة",
                  "رقم الجامعة",
                  "عدد الإخوة",
                  "المبلغ",
                  "مسار الملف",
                  "وصف الاحتياجات",
                  "تمت الموافقة من قبل المدير",
                  "محذوف",
                  "تاريخ الإنشاء",
                  "تاريخ التحديث",
                  "الإجراءات",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-right"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {beneficiaries.map(
                (
                  {
                    id,
                    userId,
                    universityName,
                    universityNo,
                    brothers,
                    amount,
                    filePath,
                    needsDescription,
                    approvedByAdmin,
                    isDeleted,
                    createdAt,
                    updatedAt,
                    User,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === beneficiaries.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {id}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {`${User?.firstName} ${User?.lastName}`}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {User?.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {universityName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {universityNo}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {brothers}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {amount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          <a
                            href={`http://localhost:4000/${filePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            عرض الملف
                          </a>
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {needsDescription}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={approvedByAdmin ? "green" : "blue-gray"}
                          value={
                            approvedByAdmin ? "تمت الموافقة" : "قيد الانتظار"
                          }
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={isDeleted ? "red" : "green"}
                          value={isDeleted ? "محذوف" : "نشط"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {new Date(createdAt).toLocaleDateString("ar-EG")}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {new Date(updatedAt).toLocaleDateString("ar-EG")}
                        </Typography>
                      </td>
                      <td className={className}>
                        {!approvedByAdmin && ( // Show the button only if not approved
                          <Button
                            color="green"
                            size="sm"
                            onClick={() => handleApprove(id)}
                          >
                            موافقة
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
