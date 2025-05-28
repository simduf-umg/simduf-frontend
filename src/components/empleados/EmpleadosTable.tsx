import { Persona } from '../../types/persona';

interface EmpleadosTableProps {
  empleados: Persona[];
}

const EmpleadosTable: React.FC<EmpleadosTableProps> = ({ empleados }) => {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4 px-4 font-medium text-black dark:text-white">Nombre</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Apellido</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id_persona}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {empleado.nombre}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {empleado.apellido}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {new Date(empleado.fecha_nacimiento).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpleadosTable;
