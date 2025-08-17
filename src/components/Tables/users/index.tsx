import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { compactFormat, standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { ChannelData } from "@/utils/props";

interface UsersProps {
  className?: string;
  data: ChannelData[]; // Accept data as a prop
}

export function Users({ className, data }: UsersProps) {
  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Users
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            {/* Dynamically render the headers based on the first row's data labels */}
            {Object.keys(data[0]).map((key) => (
              <TableHead key={key} className={key === 'source' ? "min-w-[120px] !text-left" : ""}>
                {data[0][key as keyof ChannelData].label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((channel, i) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={channel.source.value + i}
            >
              {/* Render each row based on the column keys */}
              {Object.keys(channel).map((key) => (
                <TableCell
                  key={key}
                  className={key === 'revenues' ? "!text-right text-green-light-1" : ""}
                >
                  {key === "source" ? (
                    <div className="flex min-w-fit items-center gap-3">
                      <Image
                        src={channel.source.logo}
                        className="size-8 rounded-full object-cover"
                        width={40}
                        height={40}
                        alt={channel.source.value + " Logo"}
                        role="presentation"
                      />
                      <div>{channel[key as keyof ChannelData].value}</div>
                    </div>
                  ) : key === "revenues" ? (
                    `$${standardFormat(Number(channel[key as keyof ChannelData].value))}`
                  ) : key === "conversion" ? (
                    `${channel[key as keyof ChannelData].value}%`
                  ) : (
                    compactFormat(Number(channel[key as keyof ChannelData].value))
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
