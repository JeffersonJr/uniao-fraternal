import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Member } from "@/lib/members-db";
import logoUrl from "@/assets/logo.svg";
import gombLogoUrl from "@/assets/gomb-logo.png";

interface MembershipCardProps {
  member: Member;
  viewMode?: "digital" | "print" | "digital-pdf";
}

export function MembershipCard({ member, viewMode = "digital" }: MembershipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const valUrl = `${window.location.origin}/membros/carteirinha/validar?id=${member.id}`;
      QRCode.toDataURL(
        valUrl,
        {
          margin: 1,
          width: 250,
          color: {
            dark: "#0b1528", // deep navy
            light: "#ffffff",
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrUrl(url);
          }
        }
      );
    }
  }, [member.id]);

  if (viewMode === "print") {
    /* PRINT MODE: HORIZONTAL SIDE-BY-SIDE CARDS */
    return (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-5xl select-none print:flex-row print:gap-4 print:justify-center">
        {/* FRONT CARD (Horizontal) */}
        <div className="relative w-[460px] h-[280px] rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] shadow-elegant flex flex-col justify-between overflow-hidden print:shadow-none print:border-[#C5A059]/80">
          {/* Background watermark */}
          <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
            <img src={logoUrl} alt="Watermark" className="w-[85%] h-[85%] object-contain" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#C5A059]/40 pb-2">
            <div className="flex items-center gap-2.5">
              <img src={logoUrl} alt="Brasão" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] leading-none font-bold">A.R.L.S.</h3>
                <h2 className="font-display text-sm font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
                <p className="text-[7px] uppercase tracking-[0.05em] text-muted-foreground">Filiada ao Grande Oriente Maçônico do Brasil</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#137333]/10 text-[#137333] border border-[#137333]/20 tracking-wider uppercase">
                Membro Regular
              </span>
            </div>
          </div>

          {/* Body content */}
          <div className="relative z-10 grid grid-cols-[100px_1fr] gap-4 items-center my-auto">
            {/* Left side: Photo & CIM */}
            <div className="flex flex-col items-center">
              <div className="w-[90px] h-[90px] rounded-xl overflow-hidden border border-[#C5A059] shadow-sm bg-black/5 flex items-center justify-center">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display text-[#C5A059] text-3xl">G</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <span className="text-[7px] text-muted-foreground uppercase tracking-widest block">CIM</span>
                <span className="text-xs font-bold text-[#0C1938]">{member.cim}</span>
              </div>
            </div>

            {/* Right side: Member Details */}
            <div className="space-y-2">
              <div>
                <span className="text-[7px] text-muted-foreground uppercase tracking-wider block">Nome do Ir.·.</span>
                <h3 className="font-display text-lg font-bold text-[#0C1938] leading-tight truncate">
                  {member.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#C5A059]/20 pt-2">
                <div>
                  <span className="text-[7px] text-muted-foreground uppercase tracking-wider block">Grau Maçônico</span>
                  <span className="text-xs font-semibold text-[#C5A059]">{member.role}</span>
                </div>
                <div>
                  <span className="text-[7px] text-muted-foreground uppercase tracking-wider block">Data Iniciação</span>
                  <span className="text-xs font-medium text-[#0C1938]">{member.initiationDate}</span>
                </div>
                {member.office && (
                  <div className="col-span-2 border-t border-[#C5A059]/15 pt-1">
                    <span className="text-[7px] text-muted-foreground uppercase tracking-wider block">Cargo na Loja</span>
                    <span className="text-xs font-bold text-[#C5A059]">{member.office}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/20 pt-2 text-[7px] text-muted-foreground">
            <div>
              <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold leading-none mb-0.5">T.·. F.·. A.·.</p>
              <p className="text-[6px] font-semibold text-[#0C1938] leading-none">Filiada ao G.O.M.B.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-[6px]">Or.·. de Praia Grande — SP</p>
              <img src={gombLogoUrl} alt="Logo GOMB" className="h-8 w-8 object-contain" />
            </div>
          </div>
        </div>

        {/* BACK CARD (Horizontal) */}
        <div className="relative w-[460px] h-[280px] rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] shadow-elegant flex flex-col justify-between overflow-hidden print:shadow-none print:border-[#C5A059]/80">
          {/* Background watermark */}
          <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
            <img src={logoUrl} alt="Watermark" className="w-[85%] h-[85%] object-contain" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center gap-2 border-b border-[#C5A059]/40 pb-2">
            <img src={logoUrl} alt="Brasão" className="h-7 w-7 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
            <div>
              <h2 className="font-display text-xs font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
              <p className="text-[7px] uppercase tracking-[0.05em] text-muted-foreground">Validação de Credencial Maçônica</p>
            </div>
          </div>

          {/* Body content */}
          <div className="relative z-10 grid grid-cols-[100px_1fr] gap-5 items-center my-auto">
            {/* Left side: QR Code */}
            <div className="flex flex-col items-center">
              <div className="p-1.5 bg-white border border-[#C5A059]/40 rounded-xl shadow-sm max-w-[90px]">
                {qrUrl ? (
                  <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
                ) : (
                  <div className="w-[75px] h-[75px] bg-gray-100 animate-pulse rounded-lg" />
                )}
              </div>
            </div>

            {/* Right side: Validação & Assinaturas */}
            <div className="space-y-4">
              <div>
                <p className="text-[#C5A059] uppercase tracking-[0.1em] text-[8px] font-bold">
                  Autenticação Eletrônica
                </p>
                <p className="text-[8px] text-muted-foreground leading-normal max-w-[280px]">
                  Use a câmera do celular para escanear o QR Code ao lado. O sistema verificará a situação cadastral do irmão em tempo real.
                </p>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                    Venerável Mestre
                  </span>
                  <span className="w-20 h-[0.5px] bg-[#C5A059]/40 mb-0.5" />
                  <span className="text-[6px] uppercase text-muted-foreground">Venerável Mestre</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                    Secretário
                  </span>
                  <span className="w-20 h-[0.5px] bg-[#C5A059]/40 mb-0.5" />
                  <span className="text-[6px] uppercase text-muted-foreground">Secretário</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/20 pt-2 text-[7px] text-muted-foreground">
            <div>
              <p className="uppercase tracking-[0.1em] text-[#C5A059] font-bold leading-none mb-0.5">G.·. A.·. D.·. U.·.</p>
              <p className="text-[6px] font-semibold text-[#0C1938] leading-none">Filiada ao G.O.M.B.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <p>Fundação: 09/03/2024</p>
              <img src={gombLogoUrl} alt="Logo GOMB" className="h-6 w-6 object-contain" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "digital-pdf") {
    return (
      <div className="flex flex-col items-center justify-center w-full print:w-full print:h-full">
        {/* Page 1: Front */}
        <div className="digital-pdf-page">
          <div className="digital-pdf-card-wrapper">
            <div className="digital-pdf-card-content">
              <div className="w-full h-full rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] flex flex-col justify-between overflow-hidden relative select-none">
                {/* Background watermark */}
                <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
                  <img src={logoUrl} alt="Watermark" className="w-[110%] h-[110%] object-contain" />
                </div>

                {/* Top Bar / Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <img src={logoUrl} alt="Brasão" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
                    <div>
                      <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] leading-none font-bold">A.R.L.S.</h3>
                      <h2 className="font-display text-xs font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
                      <p className="text-[7px] uppercase tracking-[0.05em] text-muted-foreground">Oriente de Praia Grande</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#137333]/10 text-[#137333] border border-[#137333]/20 tracking-wider uppercase">
                      Membro Regular
                    </span>
                  </div>
                </div>

                {/* Profile Section */}
                <div className="relative z-10 flex flex-col items-center my-auto">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 rounded-xl border border-[#C5A059]/50 rotate-3 scale-105 pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl border border-[#C5A059]/50 -rotate-3 scale-105 pointer-events-none" />
                    <div className="w-28 h-28 rounded-xl overflow-hidden border border-[#C5A059] relative z-10 shadow-sm bg-black/5 flex items-center justify-center">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display text-[#C5A059] text-3xl">G</span>
                      )}
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h2 className="font-display text-xl text-center text-[#0C1938] leading-snug font-bold mb-1">
                    {member.name}
                  </h2>
                  <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
                    {member.role}
                  </p>

                  {/* Card Details grid */}
                  <div className="w-full grid grid-cols-2 gap-3 border-t border-b border-[#C5A059]/30 py-3.5 px-2.5 bg-[#F3EFE4]/35 rounded-xl text-left">
                    <div>
                      <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">Iniciação</p>
                      <p className="text-xs text-[#0C1938] font-bold">{member.initiationDate}</p>
                    </div>
                    <div>
                      <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">CIM Número</p>
                      <p className="text-xs text-[#0C1938] font-bold">{member.cim}</p>
                    </div>
                    {member.office && (
                      <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                        <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">Cargo na Loja</p>
                        <p className="text-xs text-[#C5A059] font-bold">{member.office}</p>
                      </div>
                    )}
                    <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                      <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">E-mail</p>
                      <p className="text-xs text-[#0C1938] font-medium truncate">{member.email}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar / Footer */}
                <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/40 pt-2.5 text-muted-foreground text-[8px]">
                  <div>
                    <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold">G.·. A.·. D.·. U.·.</p>
                    <p className="mt-0.5 text-[7px] font-semibold text-[#0C1938]">Filiada ao G.O.M.B.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={gombLogoUrl} alt="Logo GOMB" className="h-8 w-8 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2: Back */}
        <div className="digital-pdf-page">
          <div className="digital-pdf-card-wrapper">
            <div className="digital-pdf-card-content">
              <div className="w-full h-full rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] flex flex-col justify-between overflow-hidden relative select-none">
                {/* Background watermark */}
                <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
                  <img src={logoUrl} alt="Watermark" className="w-[110%] h-[110%] object-contain" />
                </div>

                {/* Top Bar / Header */}
                <div className="relative z-10 flex items-center gap-2.5 border-b border-[#C5A059]/40 pb-2.5">
                  <img src={logoUrl} alt="Brasão" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
                  <div>
                    <h2 className="font-display text-xs font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
                    <p className="text-[7px] uppercase tracking-[0.05em] text-[#C5A059]/90 font-bold">Validação Cadastral</p>
                  </div>
                </div>

                {/* QR Code Validation Section */}
                <div className="relative z-10 flex flex-col items-center my-auto">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-[#C5A059]/30 mb-3 max-w-[150px]">
                    {qrUrl ? (
                      <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 animate-pulse rounded-lg" />
                    )}
                  </div>
                  <p className="text-[#C5A059] uppercase tracking-[0.15em] text-[8px] font-bold mb-0.5">
                    VALIDAÇÃO ELETRÔNICA
                  </p>
                  <p className="text-muted-foreground text-[8px] text-center max-w-[230px] leading-normal">
                    Use a câmera do celular para escanear o QR Code acima e consultar a autenticidade desta credencial.
                  </p>
                </div>

                {/* Signature Block */}
                <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-[#C5A059]/30 pt-3 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                      Venerável Mestre
                    </span>
                    <span className="w-20 h-[0.5px] bg-[#C5A059]/30 mb-0.5" />
                    <span className="text-[6px] uppercase tracking-[0.1em] text-muted-foreground">Venerável Mestre</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                      Secretário
                    </span>
                    <span className="w-20 h-[0.5px] bg-[#C5A059]/30 mb-0.5" />
                    <span className="text-[6px] uppercase tracking-[0.1em] text-muted-foreground">Secretário</span>
                  </div>
                </div>

                {/* Bottom Bar / Footer */}
                <div className="relative z-10 flex justify-between items-end text-[7px] text-muted-foreground pt-1.5 border-t border-[#C5A059]/15">
                  <div>
                    <p className="text-[7px]">Fundação: 09/03/2024</p>
                    <p className="text-[6px] font-semibold text-[#0C1938] mt-0.5">Filiada ao G.O.M.B.</p>
                  </div>
                  <img src={gombLogoUrl} alt="Logo GOMB" className="h-6 w-6 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* DIGITAL MODE: VERTICAL FLIPPING CARD (iPhone dimensions matching screen) */
  return (
    <div className="phone-mockup-wrapper select-none">
      <div className="phone-mockup-scale py-4">
        {/* 3D Card Container (Resized wider, 380x537px - PDF standard aspect ratio) */}
        <div
          className="w-[380px] h-[537px] perspective-1000 cursor-pointer"
          onClick={() => setFlipped(!flipped)}
        >
          {/* Card Flipper wrapper */}
          <div
            className={`relative w-full h-full duration-700 preserve-3d ${
              flipped ? "rotate-y-180" : ""
            }`}
          >
            {/* FRONT OF THE CARD */}
            <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] shadow-elegant backface-hidden flex flex-col justify-between overflow-hidden">
              {/* Background watermark */}
              <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
                <img src={logoUrl} alt="Watermark" className="w-[110%] h-[110%] object-contain" />
              </div>

              {/* Top Bar / Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <img src={logoUrl} alt="Brasão" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
                  <div>
                    <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] leading-none font-bold">A.R.L.S.</h3>
                    <h2 className="font-display text-xs font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
                    <p className="text-[7px] uppercase tracking-[0.05em] text-muted-foreground">Oriente de Praia Grande</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#137333]/10 text-[#137333] border border-[#137333]/20 tracking-wider uppercase">
                    Membro Regular
                  </span>
                </div>
              </div>

              {/* Profile Section */}
              <div className="relative z-10 flex flex-col items-center my-auto">
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-xl border border-[#C5A059]/50 rotate-3 scale-105 pointer-events-none" />
                  <div className="absolute inset-0 rounded-xl border border-[#C5A059]/50 -rotate-3 scale-105 pointer-events-none" />
                  <div className="w-28 h-28 rounded-xl overflow-hidden border border-[#C5A059] relative z-10 shadow-sm bg-black/5 flex items-center justify-center">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display text-[#C5A059] text-3xl">G</span>
                    )}
                  </div>
                </div>

                {/* Name & Role */}
                <h2 className="font-display text-xl text-center text-[#0C1938] leading-snug font-bold mb-1">
                  {member.name}
                </h2>
                <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
                  {member.role}
                </p>

                {/* Card Details grid */}
                <div className="w-full grid grid-cols-2 gap-3 border-t border-b border-[#C5A059]/30 py-3.5 px-2.5 bg-[#F3EFE4]/35 rounded-xl text-left">
                  <div>
                    <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">Iniciação</p>
                    <p className="text-xs text-[#0C1938] font-bold">{member.initiationDate}</p>
                  </div>
                  <div>
                    <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">CIM Número</p>
                    <p className="text-xs text-[#0C1938] font-bold">{member.cim}</p>
                  </div>
                  {member.office && (
                    <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                      <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">Cargo na Loja</p>
                      <p className="text-xs text-[#C5A059] font-bold">{member.office}</p>
                    </div>
                  )}
                  <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                    <p className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground mb-0.5">E-mail</p>
                    <p className="text-xs text-[#0C1938] font-medium truncate">{member.email}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Bar / Footer */}
              <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/40 pt-2.5 text-muted-foreground text-[8px]">
                <div>
                  <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold">G.·. A.·. D.·. U.·.</p>
                  <p className="mt-0.5 text-[7px] font-semibold text-[#0C1938]">Filiada ao G.O.M.B.</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={gombLogoUrl} alt="Logo GOMB" className="h-8 w-8 object-contain" />
                </div>
              </div>
            </div>

            {/* BACK OF THE CARD */}
            <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-b from-[#FCFAF6] to-[#F5F2E9] border-2 border-[#C5A059] shadow-elegant backface-hidden rotate-y-180 flex flex-col justify-between overflow-hidden">
              {/* Background watermark */}
              <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
                <img src={logoUrl} alt="Watermark" className="w-[110%] h-[110%] object-contain" />
              </div>

              {/* Top Bar / Header */}
              <div className="relative z-10 flex items-center gap-2.5 border-b border-[#C5A059]/40 pb-2.5">
                <img src={logoUrl} alt="Brasão" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.3)]" />
                <div>
                  <h2 className="font-display text-xs font-bold text-[#0C1938] leading-tight">União Fraternal Nº 1</h2>
                  <p className="text-[7px] uppercase tracking-[0.05em] text-[#C5A059]/90 font-bold">Validação Cadastral</p>
                </div>
              </div>

              {/* QR Code Validation Section */}
              <div className="relative z-10 flex flex-col items-center my-auto">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-[#C5A059]/30 mb-3 max-w-[150px]">
                  {qrUrl ? (
                    <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 animate-pulse rounded-lg" />
                  )}
                </div>
                <p className="text-[#C5A059] uppercase tracking-[0.15em] text-[8px] font-bold mb-0.5">
                  VALIDAÇÃO ELETRÔNICA
                </p>
                <p className="text-muted-foreground text-[8px] text-center max-w-[230px] leading-normal">
                  Use a câmera do celular para escanear o QR Code acima e consultar a autenticidade desta credencial.
                </p>
              </div>

              {/* Signature Block */}
              <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-[#C5A059]/30 pt-3 text-center">
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                    Venerável Mestre
                  </span>
                  <span className="w-20 h-[0.5px] bg-[#C5A059]/30 mb-0.5" />
                  <span className="text-[6px] uppercase tracking-[0.1em] text-muted-foreground">Venerável Mestre</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">
                    Secretário
                  </span>
                  <span className="w-20 h-[0.5px] bg-[#C5A059]/30 mb-0.5" />
                  <span className="text-[6px] uppercase tracking-[0.1em] text-muted-foreground">Secretário</span>
                </div>
              </div>

              {/* Bottom Bar / Footer */}
              <div className="relative z-10 flex justify-between items-end text-[7px] text-muted-foreground pt-1.5 border-t border-[#C5A059]/15">
                <div>
                  <p className="text-[7px]">Fundação: 09/03/2024</p>
                  <p className="text-[6px] font-semibold text-[#0C1938] mt-0.5">Filiada ao G.O.M.B.</p>
                </div>
                <img src={gombLogoUrl} alt="Logo GOMB" className="h-6 w-6 object-contain" />
              </div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-[10px] mt-4 italic text-center">
          Toque na carteirinha para girar e ver o verso
        </p>
      </div>
    </div>
  );
}

